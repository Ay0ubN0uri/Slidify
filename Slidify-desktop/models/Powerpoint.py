import enum
import win32com.client as win32
import pythoncom


class PowerPointCommand(enum.Enum):
    NEXT = 'next'
    PREVIOUS = 'previous'
    GOTO = 'goto'
    LAST = 'last'
    START = 'start'
    FIRST = 'first'
    EXIT = 'exit'


class PowerPoint():
    def __init__(self):
        self.powerpoint = None

    def init(self):
        # self.powerpoint = win32.Dispatch("Powerpoint.Application", pythoncom.CoInitialize())
        self.powerpoint = win32.Dispatch("Powerpoint.Application")

    def start_slide_show(self):
        try:
            self.init()
            if not hasattr(self.powerpoint, 'ActivePresentation'):
                return {
                    'error': 'There is no presentation'
                }
            presentation = self.powerpoint.ActivePresentation
            presentation.SlideShowSettings.Run()
            return {
                'success': True
            }
        except Exception as e:
            print(str(e))
            return {
                'error': e.excepinfo[2].split(':')[-1].strip().replace('  ', ' ')
            }

    def next_slide(self):
        try:
            self.init()
            if not hasattr(self.powerpoint, 'ActivePresentation'):
                return {
                    'error': 'There is no presentation'
                }
            presentation = self.powerpoint.ActivePresentation
            if presentation.SlideShowWindow.View.CurrentShowPosition == presentation.Slides.Count+1:
                return {
                    'success': False,
                    'msg': 'End of slide show'
                }
            presentation.SlideShowWindow.View.Next()
            return {
                'success': True
            }
        except Exception as e:
            print(str(e))
            return {
                'error': e.excepinfo[2].split(':')[-1].strip().replace('  ', ' ')
            }

    def prev_slide(self):
        try:
            self.init()
            if not hasattr(self.powerpoint, 'ActivePresentation'):
                return {
                    'error': 'There is no presentation'
                }
            presentation = self.powerpoint.ActivePresentation
            if presentation.SlideShowWindow.View.CurrentShowPosition == 1:
                return {
                    'success': False,
                    'msg': 'Start of slide show'
                }
            presentation.SlideShowWindow.View.Previous()
            return {
                'success': True
            }
        except Exception as e:
            print(str(e))
            return {
                'error': e.excepinfo[2].split(':')[-1].strip().replace('  ', ' ')
            }

    def goto_slide(self, slide_number):
        try:
            self.init()
            if not hasattr(self.powerpoint, 'ActivePresentation'):
                return {
                    'error': 'There is no presentation'
                }
            presentation = self.powerpoint.ActivePresentation
            if slide_number < 1 or slide_number > presentation.Slides.Count:
                return {
                    'success': False,
                    'msg': 'Invalid Slide Number'
                }
            presentation.SlideShowWindow.View.GotoSlide(slide_number)
            return {
                'success': True
            }
        except Exception as e:
            print(str(e))
            return {
                'error': e.excepinfo[2].split(':')[-1].strip().replace('  ', ' ')
            }

    def goto_first_slide(self):
        try:
            self.init()
            if not hasattr(self.powerpoint, 'ActivePresentation'):
                return {
                    'error': 'There is no presentation'
                }
            presentation = self.powerpoint.ActivePresentation
            presentation.SlideShowWindow.View.First()
            return {
                'success': True
            }
        except Exception as e:
            print(str(e))
            return {
                'error': e.excepinfo[2].split(':')[-1].strip().replace('  ', ' ')
            }

    def goto_last_slide(self):
        try:
            self.init()
            if not hasattr(self.powerpoint, 'ActivePresentation'):
                return {
                    'error': 'There is no presentation'
                }
            presentation = self.powerpoint.ActivePresentation
            presentation.SlideShowWindow.View.Last()
            return {
                'success': True
            }
        except Exception as e:
            print(str(e))
            return {
                'error': e.excepinfo[2].split(':')[-1].strip().replace('  ', ' ')
            }

    def get_names(self):
        for i in range(self.powerpoint.Presentations.Count + 1):
            pptItem = self.powerpoint.Presentations.Item(i)
            print(pptItem.Name)

    def exit_slide_show(self):
        try:
            self.init()
            if not hasattr(self.powerpoint, 'ActivePresentation'):
                return {
                    'error': 'Invalid request. There is no active presentation.'
                }
            presentation = self.powerpoint.ActivePresentation
            presentation.SlideShowWindow.View.Exit()
            return {
                'success': True
            }
        except Exception as e:
            print(str(e))
            return {
                'error': e.excepinfo[2].split(':')[-1].strip().replace('  ', ' ')
            }

    def get_infos(self):
        try:
            self.init()
            if not hasattr(self.powerpoint, 'ActivePresentation'):
                return {
                    'error': 'Invalid request. There is no active presentation.'
                }
            presentation = self.powerpoint.ActivePresentation
            count = presentation.Slides.Count
            name = presentation.Name
            if self.is_slide_show_active():
                curr_slide = presentation.SlideShowWindow.View.Slide.SlideIndex
                return {
                    'count': count,
                    'name': name,
                    'curr_slide': curr_slide,
                    'is_active': True
                }
            else:
                curr_slide = presentation.Windows(1).View.Slide.SlideIndex
                return {
                    'count': count,
                    'name': name,
                    'curr_slide': curr_slide,
                    'is_active': False
                }
        except Exception as e:
            print(str(e))
            return {
                # 'error': str(e)
                'error': e.excepinfo[2].split(':')[-1].strip().replace('  ', ' ')
            }

    def is_slide_show_active(self):
        try:
            self.init()
            presentation = self.powerpoint.ActivePresentation
            if presentation.SlideShowWindow is not None:
                return True
            else:
                return False
        except Exception as e:
            print('An exception occurred', str(e))
            return False

    def is_slide_show_active2(self):
        try:
            presentation = self.powerpoint.ActivePresentation
            if presentation.SlideShowWindow is not None:
                return True
            else:
                return False
        except Exception as e:
            print('An exception occurred', str(e))
            return False

    def get_active_slide_show_name(self):
        try:
            self.init()
            return self.powerpoint.ActivePresentation.Name
        except Exception as e:
            print('An exception occurred', str(e))
            return None
